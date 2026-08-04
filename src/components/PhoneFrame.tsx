import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #0f1f3d 0%, #1B3A6B 50%, #1a4a8a 100%)",
      }}
    >
      <div className="relative w-full max-w-[390px]">
        {/* Outer shell */}
        <div className="bg-slate-900 rounded-[52px] p-[10px] shadow-2xl shadow-black/70 ring-1 ring-white/5">
          {/* Screen */}
          <div
            className="bg-white rounded-[44px] overflow-hidden"
            style={{ height: "844px", display: "flex", flexDirection: "column" }}
          >
            {/* Status bar — fixed height */}
            <div
              className="flex-shrink-0 h-12 flex items-center justify-between px-8 bg-white z-20"
              style={{ position: "relative" }}
            >
              <span className="text-[12px] font-bold text-slate-800">9:41</span>
              {/* Dynamic island */}
              <div className="w-[120px] h-[34px] bg-slate-900 rounded-full absolute top-1.5 left-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-1.5">
                <div className="flex gap-[2px] items-end h-3">
                  {[30, 50, 70, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-slate-800 rounded-sm"
                      style={{ height: `${h}%`, opacity: 0.4 + i * 0.2 }}
                    />
                  ))}
                </div>
                <div className="flex items-center border border-slate-800/40 rounded-[3px] px-0.5 gap-0.5">
                  <div className="h-2 bg-slate-800 rounded-sm w-[14px]" />
                  <div className="w-px h-1.5 bg-slate-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Content fills remaining height */}
            <div className="flex-1 overflow-hidden relative">
              {children}
            </div>
          </div>
        </div>

        {/* Physical buttons */}
        <div className="absolute -right-[5px] top-[120px] w-[4px] h-[60px] bg-slate-700 rounded-r-full" />
        <div className="absolute -left-[5px] top-[90px] w-[4px] h-[36px] bg-slate-700 rounded-l-full" />
        <div className="absolute -left-[5px] top-[140px] w-[4px] h-[60px] bg-slate-700 rounded-l-full" />
        <div className="absolute -left-[5px] top-[215px] w-[4px] h-[60px] bg-slate-700 rounded-l-full" />
      </div>
    </div>
  );
}
