import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  isMuted: boolean;
  toggleMute: () => void;
};

const HamburgerMenu: React.FC<Props> = ({ isMuted, toggleMute }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-6 right-6 z-30">
      {/* 漢堡按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 bg-black/40 rounded-md hover:bg-black/60 transition"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 下拉選單 */}
      {open && (
        <div className="mt-2 bg-black/70 text-white rounded-md shadow-lg p-4 w-52 animate-fade-in space-y-3">
          {/* 音樂控制 */}
          <div className="flex justify-between items-center">
            <span>背景音樂</span>
            <button
              onClick={toggleMute}
              className="px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-200"
            >
              {isMuted ? "開啟" : "靜音"}
            </button>
          </div>

          {/* 導覽連結（未來頁面可啟用） */}
          <div className="text-sm space-y-2">
            <Link to="/" className="block hover:underline">
              返回首頁
            </Link>
            <a
              href="https://terra-universe.io/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              Terra 白皮書
            </a>
            <Link to="/personalities" className="block hover:underline">
              人格介紹
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
