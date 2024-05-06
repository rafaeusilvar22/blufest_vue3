// Autenticação do Supabase
import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/useAuthUser.js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Configura um ouvinte para alterações de estado de autenticação.
// Sempre que o estado de autenticação mudar, a função de retorno de chamada fornecida será executada.
supabase.auth.onAuthStateChange((event, session) => {
  // Esse gancho retorna algumas informações sobre o usuário autenticado, como ID e e-mail.
  const { user } = useAuthUser();

  // Aqui está atualizando a user variável com as informações do usuário da sessão, se disponível ( session?.user).
  // Se o usuário da sessão não estiver disponível, ele será definido user como null.
  user.value = session?.user || null;
});

export default function useSupabase() {
  return {
    supabase,
  };
}
