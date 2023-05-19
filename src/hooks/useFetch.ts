import Form from "@/interfaces/Form";

const BASE_URL = "http://localhost:8080";

interface Login {
  email: string;
  password: string;
}
export const useFetch = () => {
  const getHeaders = (
    authToken: string = "",
    contentType: string = "application/json"
  ) => {
    const headers = new Headers();
    headers.append("Content-Type", contentType);
    headers.append("Authorization", `${authToken}`);
    return headers;
  };

  const createUser = async (
    data: Form,
    role: string
  ): Promise<{ success: boolean; data: {} }> => {
    const body = JSON.stringify({
      userDetails: {
        email: data.email,
        password: data.password,
        role,
        profile_pic:
          "iVBORw0KGgoAAAANSUhEUgAACAAAAAgAAQAAAACa3O6dAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfmBB0JAgvxD/s4AAACFUlEQVR42u3BMQEAAADCoPVP7W0HoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN4ACHgAAfotprsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMjlUMDk6MDI6MTErMDA6MDArXu12AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTI5VDA5OjAyOjExKzAwOjAwWgNVygAAAABJRU5ErkJggg==",
      },
      personDetails: {
        name: data.name,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        email: data.email,
        professional_card: data.cardNumber,
      },
    });

    try {
      const res = await fetch(`${BASE_URL}/users/new`, {
        method: "POST",
        body,
        headers: getHeaders(),
      });
      console.log({ res, body: JSON.parse(body) });
      const dataRes = await res.text();

      console.log({ res, dataRes, body });

      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }

      return { success: true, data: dataRes };
      //@ts-ignore
    } catch (error: Error) {
      return error;
    }
  };

  // @ts-ignore
  const login = async (data: Login) => {
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body,
        headers: getHeaders(),
      });
      const dataRes = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (userId: string, authToken: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: getHeaders(authToken),
      });
      const dataRes = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const vetAddCustomer = async (data: Customer, role: string) => {
    const body = JSON.stringify({
      userDetails: {
        email: data.email,
        password: "1",
        role,
        profile_pic:
          "iVBORw0KGgoAAAANSUhEUgAACAAAAAgAAQAAAACa3O6dAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfmBB0JAgvxD/s4AAACFUlEQVR42u3BMQEAAADCoPVP7W0HoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN4ACHgAAfotprsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMjlUMDk6MDI6MTErMDA6MDArXu12AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTI5VDA5OjAyOjExKzAwOjAwWgNVygAAAABJRU5ErkJggg==",
      },
      personDetails: {
        name: data.name,
        last_name: "s",
        phone_number: data.phone_number,
        email: data.email,
        address: data.address,
      },
    });

    try {
      const res = await fetch(`${BASE_URL}/users/new`, {
        method: "POST",
        body,
        headers: getHeaders(),
      });
      const dataRes = await res.text();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsers = async (authToken: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/all`, {
        method: "GET",
        headers: getHeaders(authToken),
      });
      const dataRes = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const createNewPet = async (
    authToken: string,
    data: Pet,
    ownerId: string
  ) => {
    try {
      const body = JSON.stringify({
        name: data.name,
        specs: data.breed,
        type: data.breed,
        owner_id: ownerId,
        pet_pic: data.img,
      });
      console.log(JSON.parse(body));
      const res = await fetch(`${BASE_URL}/pets/new`, {
        method: "POST",
        body,
        headers: getHeaders(authToken),
      });
      const dataRes = await res.text();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPets = async (idUser: string, authToken: string) => {
    try {
      const res = await fetch(`${BASE_URL}/pets/all`, {
        method: "GET",
        headers: getHeaders(authToken, idUser),
      });
      const dataRes = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  const createDate = async (authToken: string, data: {}) => {
    try {
      const body = JSON.stringify({
        pet_id: data?.owner_id,
        date: data?.date,
      });

      console.log({ body });
      const res = await fetch(`${BASE_URL}/visits/new`, {
        method: "POST",
        body,
        headers: getHeaders(authToken),
      });

      const dataRes = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }
      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  return {
    createUser,
    login,
    getUser,
    vetAddCustomer,
    getAllUsers,
    createNewPet,
    getAllPets,
    createDate,
  };
};
