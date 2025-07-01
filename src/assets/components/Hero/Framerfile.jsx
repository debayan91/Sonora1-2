const FramerEmbed = () => {
  return (
    <div className="relative inset-0 w-[100vw] h-[100vh] overflow-hidden">
      <iframe
        src="https://lively-sense-987894.framer.app/"
        className="w-[100vw] h-[100vh] border-0"
        allowFullScreen
        style={{
          width: '100vw',
          height: '100dvh',
          border: 'none',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      />
     
    </div>
  );
};

export default FramerEmbed;