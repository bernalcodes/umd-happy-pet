import Form from "@/interfaces/Form";

const BASE_URL = "https://ws-happypet.onrender.com";

interface Login {
  email: string;
  password: string;
}
export const useFetch = () => {
  const getHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  };

  const createUser = async (
    data: Form
  ): Promise<{ success: boolean; data: {} }> => {
    const body = JSON.stringify({
      userDetails: {
        email: data.email,
        password: data.password,
        role: data.role === "I'm a Veterinarian" ? "VETERINARY" : "CUSTOMER",
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
        mode: "no-cors",
        headers: getHeaders(),
        body,
      });
      console.log({ res });
      const dataRes = (await res?.text()) || (await res?.json());

      console.log({ body, res, dataRes });

      if (!res.ok) {
        throw new Error(JSON.stringify({ status: res.status, json: dataRes }));
      }

      return { success: true, data: dataRes };
    } catch (err) {
      console.log(err);
    }
  };

  return { createUser, login };
};
