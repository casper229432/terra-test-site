import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  isMuted: boolean;
  toggleMute: () => void;
};

const HamburgerMenu: React.FC<Props> = ({ isMuted, toggleMute }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-6 right-6 z-30">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 bg-black/40 rounded-md hover:bg-black/60 transition"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="mt-2 bg-black/70 text-white rounded-md shadow-lg p-4 w-48 animate-fade-in">
          <div className="flex justify-between items-center">
            <span>背景音樂</span>
            <button
              onClick={toggleMute}
              className="px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-200"
            >
              {isMuted ? "開啟" : "靜音"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
