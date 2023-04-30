import FormCardLogIn from "@/components/FormCardLogIn/FormCardLogIn";
import LayoutAuth from "@/components/Layout/LayoutAuth";

const index = () => {
  return (
    <LayoutAuth isLogin>
      <FormCardLogIn />
    </LayoutAuth>
  );
};

export default index;
