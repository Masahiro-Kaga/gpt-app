import { css } from '@emotion/react'

import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import SideSettingDrawer from "../components/common/SideSettingDrawer";

const ImageGeneratorPage = () => {
  const container = css({
    backgroundColor: 'yellow',
  })

  return (
    <div css={container}>
      <ImageGenerator></ImageGenerator>
      <SideSettingDrawer></SideSettingDrawer>
    </div>
  );
};

export default ImageGeneratorPage;
