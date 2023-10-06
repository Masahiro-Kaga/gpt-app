import GptHandler from "../components/GptHandle/GptHandler";
import SettingDrawer from "../components/common/SettingDrawer";
import BackgroundImage from "../components/common/BackgroundImage";

const GptHandlerPage: React.FC = () => {
  return (
    <>
      <BackgroundImage url="/images/background-images/dashboard-bg.jpeg" />
      <GptHandler></GptHandler>
    </>
  );
};

export default GptHandlerPage;
