import { ref } from "vue";
import useSupabase from "src/boot/supabase";

const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  // Faça login em um usuário existente com e-mail e senha ou telefone e senha.
  // Esteja ciente de que você poderá receber uma mensagem de erro que não fará distinção
  // entre os casos em que a conta não existe ou que a combinação de e-mail/telefone e senha
  // está errada ou que a conta só pode ser acessada via login social.
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  // Dentro de um contexto de navegador, signOut() removerá o usuário conectado da sessão
  // do navegador e desconectará-o - removendo todos os itens do armazenamento local
  // e acionando um evento "SIGNED_OUT". Para gerenciamento no lado do servidor,
  // você pode revogar todos os tokens de atualização de um usuário,
  // passando o JWT do usuário para auth.api.signOut(JWT: string).
  // Não há como revogar o token de acesso jwt de um usuário até que ele expire.
  // Recomenda-se definir um prazo de validade mais curto no jwt por esse motivo.
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = async () => {
    return !!user.value;
  };

  // Cria um novo usuário. Esteja ciente de que se existir uma conta de usuário no sistema,
  // você poderá receber uma mensagem de erro tentando ocultar essas informações do usuário.
  //  Este método tem suporte para PKCE por meio de inscrições por e-mail.
  //  O fluxo PKCE não pode ser usado quando a confirmação automática está habilitada.
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: meta,
        redirecTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
      }
    );
    if (error) throw error;
    return user;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  async function resetPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
    return user;
  }

  return {
    user,
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
  };
}
