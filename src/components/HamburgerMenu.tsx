import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  isMuted: boolean;
  toggleMute: () => void;
};

const HamburgerMenu: React.FC<Props> = ({ isMuted, toggleMute }) => {
  const [open, setOpen] = useState(false);
  const [expandQuadrant, setExpandQuadrant] = useState(false);

  const handleClose = () => {
    setExpandQuadrant(false);
    setOpen(false);
  };

  return (
    <div className="absolute top-6 right-6 z-30">
      {/* 漢堡按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 bg-black/40 rounded-md hover:bg-black/60 transition"
        aria-label={open ? "關閉選單" : "打開選單"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 全屏選單 */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black text-white z-40 flex flex-col items-center text-center p-6 overflow-auto"
          >
            {/* 關閉按鈕 */}
            <button
              onClick={handleClose}
              className="self-end text-white p-2 hover:text-gray-300"
              aria-label="關閉選單"
            >
              <X size={32} />
            </button>

            {/* 聲音控制 */}
            <div className="flex justify-between items-center w-full mt-4">
              <span className="text-lg">背景音樂</span>
              <button
                onClick={toggleMute}
                className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition"
              >
                {isMuted ? "開啟" : "靜音"}
              </button>
            </div>

            {/* 重新測驗 */}
            <Link
              to="/"
              onClick={handleClose}
              className="mt-6 text-xl font-medium w-full"
            >
              重新測驗
            </Link>

            {/* 官方導覽 */}
            <a
              href="https://test.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="mt-4 text-xl font-medium w-full"
            >
              什麼是 TERRA？
            </a>

            {/* 四大象限 with 展開 */}
            <div className="mt-6 w-full">
              <button
                onClick={() => setExpandQuadrant(!expandQuadrant)}
                className="w-full flex justify-between items-center text-xl font-medium"
              >
                <span>四大象限</span>
                <span className="ml-2">{expandQuadrant ? "－" : "+"}</span>
              </button>
              {expandQuadrant && (
                <div className="mt-4 flex flex-col space-y-3 w-full">
                  <a
                    href="https://test.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="text-lg w-full"
                  >
                    A 類型｜熾燄英雄
                  </a>
                  <a
                    href="https://test.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="text-lg w-full"
                  >
                    B 類型｜現實玩家
                  </a>
                  <a
                    href="https://test.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="text-lg w-full"
                  >
                    C 類型｜靈魂造者
                  </a>
                  <a
                    href="https://test.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="text-lg w-full"
                  >
                    D 類型｜黑暗反者
                  </a>
                </div>
              )}
            </div>

            {/* T模型與四象限 */}
            <a
              href="https://test.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="mt-6 text-xl font-medium w-full"
            >
              T 模型與四象限
            </a>

            {/* 白皮書 */}
            <a
              href="https://test.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="mt-4 text-xl font-medium w-full"
            >
              白皮書
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
