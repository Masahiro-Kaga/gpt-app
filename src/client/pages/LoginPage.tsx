import Login from "../components/common/Login";
import BackgroundImage from "../components/common/BackgroundImage";

const LoginPage = () => {
  return (
    <div className="relative">
      <BackgroundImage url="/images/background-images/login_bg.jpeg" classOption="opacity-80 brightness-50 grayscale" />
      <Login></Login>
    </div>
  );
};

export default LoginPage;
