import { apiPrefix, post } from "@/repositories/axiosBase";
import { AppUser } from "@/models/appUser";

export const signIn = async (data: { id: string; password: string }) => {
  const res = await post<
    {
      appUser: AppUser;
      jwtToken: string;
      refreshToken: string;
    },
    { id: string; password: string }
  >("login", data);
  const appUser = new AppUser(
    res.appUser.id,
    res.appUser.accountID,
    res.appUser.password,
    res.appUser.name
  );

  return {
    appUser: appUser,
    jwtToken: res.jwtToken,
    refreshToken: res.refreshToken,
  };
};

export const refreshToken = async (data: { id: string }) => {
  const res = await post<
    {
      jwtToken: string;
      refreshToken: string;
    },
    { id: string }
  >(apiPrefix + "refreshToken", data);

  return {
    jwtToken: res.jwtToken,
    refreshToken: res.refreshToken,
  };
};
