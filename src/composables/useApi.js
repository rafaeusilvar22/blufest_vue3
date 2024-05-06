import useSupabase from "src/boot/supabase";
import useAuthUser from "./useAuthUser";
import { v4 as uuidv4 } from "uuid";

export default function userApi() {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  // buscar eventos na tabela posts
  const fetchEvents = async (table, category, date) => {
    let query = supabase
      .from(table)
      .select("*")
      .order("date")
      .gte("date", date);

    if (category !== "") {
      query = query.eq("category", category);
    }

    return await executeQuery(query);
  };

  const executeQuery = async (query) => {
    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  // buscar locais da cidade na tabela places
  const listPlace = async (table, column, category) => {
    let query = supabase.from(table).select();

    if (category !== 0) {
      query = query.eq(column, category);
    }

    return await executeQuery(query);
  };

  // buscar pontos turisticos da cidade na tabela tourism
  const listTourism = async (table, category) => {
    const { data, error } = await supabase.from(table).select(category);
    if (error) throw error;
    return data;
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;
    return data;
  };

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4();
    const { error } = supabase.storage.from(storage).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  const updateImgBucket = async (file, storage) => {
    const fileName = uuidv4() + ".png";
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.storage
      .from(storage)
      .update(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) throw error;
  };

  const getUrlPublic = async (fileName, storage) => {
    const { data, error } = supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;

    return data.publicUrl;
  };

  return {
    fetchEvents,
    listPlace,
    listTourism,
    getById,
    post,
    update,
    remove,
    uploadImg,
    updateImgBucket,
  };
}
