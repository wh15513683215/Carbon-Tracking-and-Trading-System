import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const Guide = () => {
  const [run, setRun] = React.useState(true);
  const steps = [
    {
      target: '.my-first-step',
      content: '这是第一步：这是您的导航栏。',
    },
    {
      target: '.my-second-step',
      content: '这是第二步：这是您个人资料的快捷方式。',
    },
    {
      target: '.my-third-step',
      content: '这是第三步：点击这里查看更多功能。',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default Guide;
