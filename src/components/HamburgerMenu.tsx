import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  isMuted: boolean;
  toggleMute: () => void;
};

// 主遮罩淡入淡出
const overlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

// 菜單垂直展開
const menuVariants: Variants = {
  hidden: { scaleY: 0, transition: { duration: 0.2 } },
  visible: { scaleY: 1, transition: { duration: 0.2 } }
};

// 子選單收合
const collapseVariants: Variants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.2 } }
};

const quadrantItems = [
  { label: "A 類型｜熾燄英雄", href: "https://test.com" },
  { label: "B 類型｜現實玩家", href: "https://test.com" },
  { label: "C 類型｜靈魂造者", href: "https://test.com" },
  { label: "D 類型｜黑暗反者", href: "https://test.com" }
];

const HamburgerMenu: React.FC<Props> = ({ isMuted, toggleMute }) => {
  const [open, setOpen] = useState(false);
  const [expandQuadrant, setExpandQuadrant] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = () => {
    setExpandQuadrant(false);
    setOpen(false);
  };

  return (
    <div className="relative z-30">
      {/* 漢堡按鈕 */}
      <button
        onClick={handleToggle}
        className="text-white p-2 bg-black/40 rounded-md hover:bg-black/60 transition"
        aria-label={open ? "關閉選單" : "打開選單"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* 遮罩 */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/70 z-40 md:hidden"

              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
            />

            {/* 行動端全屏菜單 */}
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center p-6 md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              style={{ transformOrigin: "top" }}
            >
              <button
                onClick={handleClose}
                className="self-end p-2 hover:text-gray-300"
                aria-label="關閉選單"
              >
                <X size={32} />
              </button>

              <div className="mt-4 space-y-6 w-full text-center">
                {/* 聲音控制，不關閉菜單 */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg">聲音控制</span>
                  <button
                    onClick={toggleMute}
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
                  >
                    {isMuted ? "開啟" : "靜音"}
                  </button>
                </div>

                {/* 重新測驗 */}
                <Link to="/" onClick={handleClose} className="block text-xl font-medium">
                  重新測驗
                </Link>

                {/* 什麼是 TERRA？ */}
                <a
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block text-xl font-medium"
                >
                  什麼是 TERRA？
                </a>

                {/* 四大象限 */}
                <div>
                  <button
                    onClick={() => setExpandQuadrant(prev => !prev)}
                    className="w-full flex justify-center items-center text-xl font-medium gap-2"
                  >
                    四大象限 {expandQuadrant ? "－" : "+"}
                  </button>
                  <AnimatePresence>
                    {expandQuadrant && (
                      <motion.div
                        className="overflow-hidden mt-2"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={collapseVariants}
                      >
                        <div className="flex flex-col space-y-3">
                          {quadrantItems.map(({ label, href }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleClose}
                              className="text-lg text-center"
                            >
                              {label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* T 模型與四象限 */}
                <a
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block text-xl font-medium"
                >
                  T 模型與四象限
                </a>

                {/* 白皮書 */}
                <a
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block text-xl font-medium"
                >
                  白皮書
                </a>
              </div>
            </motion.div>

            {/* 桌面端下拉菜單 */}
            <motion.div
              key="desktop-menu"
              className="absolute top-14 right-6 bg-black/70 text-white rounded-md shadow-lg p-4 w-52 hidden md:block transform origin-top-right"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <div className="flex justify-between items-center">
                <span>聲音控制</span>
                <button
                  onClick={toggleMute}
                  className="px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-200"
                >
                  {isMuted ? "開啟" : "靜音"}
                </button>
              </div>

              <Link to="/" onClick={handleClose} className="block mt-3 hover:underline">
                重新測驗
              </Link>
              <a
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="block mt-2 hover:underline"
              >
                什麼是 TERRA？
              </a>

              <button
                onClick={() => setExpandQuadrant(prev => !prev)}
                className="mt-3 w-full flex justify-between items-center hover:underline"
              >
                四大象限 {expandQuadrant ? "－" : "+"}
              </button>
              <AnimatePresence>
                {expandQuadrant && (
                  <motion.div
                    className="overflow-hidden mt-2 ml-2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={collapseVariants}
                  >
                    <div className="space-y-1">
                      {quadrantItems.map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleClose}
                          className="block hover:underline text-sm"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="block mt-3 hover:underline"
              >
                T 模型與四象限
              </a>
              <a
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="block mt-2 hover:underline"
              >
                白皮書
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
