import React from 'react';
import Guide from './Guide';

const App = () => {
  return (
    <div>
      <header className="my-first-step">导航栏</header>
      <section className="my-second-step">个人资料</section>
      <button className="my-third-step">查看更多</button>
      <Guide />
    </div>
  );
};

export default App;
