function DotPatternDiv({ children }) {
    return (
      <div className="relative w-full">
        {/* Dot Pattern Layer */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:16px_16px] opacity-100 pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, rgba(255,255,255,0) 80%)",
            WebkitMaskImage: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 10%, rgba(255,255,255,0) 80%)"
          }}
        />
  
        {/* Content Layer (Higher z-index) */}
        <div className="relative z-0 w-full">{children}</div>
      </div>
    );
  }
  
  export default DotPatternDiv;
  