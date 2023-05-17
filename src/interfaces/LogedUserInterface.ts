interface LoggedUser {
  success: boolean;
  data: {
    id: string;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: any[];
    username: string;
    Authorization: string;
  };
}
