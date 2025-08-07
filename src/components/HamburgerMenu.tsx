import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  isMuted: boolean;
  toggleMute: () => void;
};

// 遮罩淡入淡出
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// 主菜單縱向展開
const menuVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1 }
};

// 子菜單收合
const collapseVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 }
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

  const handleClose = () => {
    setExpandQuadrant(false);
    setOpen(false);
  };

  return (
    <div className="relative z-30">
      {/* 漢堡按鈕 */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-white p-2 bg-black/40 rounded-md hover:bg-black/60 transition"
        aria-label={open ? "關閉選單" : "打開選單"}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* 行動端遮罩 */}
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
              key="mobileMenu"
              className="fixed inset-0 bg-black text-white z-50 flex flex-col items-start p-6 space-y-6 md:hidden origin-top"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <button
                onClick={handleClose}
                className="self-end p-2 hover:text-gray-300"
                aria-label="關閉選單"
              >
                <X size={32} />
              </button>

              <div className="space-y-4 w-full text-left">
                {/* 聲音控制 */}
                <div className="flex items-center justify-between">
                  <span>聲音控制</span>
                  <button
                    onClick={toggleMute}
                    className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition text-sm"
                  >
                    {isMuted ? "開啟" : "靜音"}
                  </button>
                </div>

                {/* 重新測驗 */}
                <Link onClick={handleClose} to="/" className="block">
                  重新測驗
                </Link>

                {/* 什麼是 TERRA？ */}
                <a
                  onClick={handleClose}
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  什麼是 TERRA？
                </a>

                {/* 四大象限 */}
                <div>
                  <button
                    onClick={() => setExpandQuadrant(prev => !prev)}
                    className="w-full flex justify-between items-center"
                  >
                    <span>四大象限</span>
                    <span>{expandQuadrant ? '－' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandQuadrant && (
                      <motion.div
                        className="overflow-hidden mt-2 pl-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={collapseVariants}
                      >
                        {quadrantItems.map(item => (
                          <a
                            key={item.label}
                            onClick={handleClose}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-1 text-sm"
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* T 模型與四象限 */}
                <a
                  onClick={handleClose}
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  T 模型與四象限
                </a>

                {/* 白皮書 */}
                <a
                  onClick={handleClose}
                  href="https://test.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  白皮書
                </a>
              </div>
            </motion.div>

            {/* 桌面端下拉菜單 */}
            <motion.div
              key="desktopMenu"
              className="absolute top-14 right-6 bg-black/70 text-white rounded-md shadow-lg p-4 w-52 hidden md:block origin-top-right"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <div className="flex items-center justify-between mb-2">
                <span>聲音控制</span>
                <button
                  onClick={toggleMute}
                  className="px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-200"
                >
                  {isMuted ? "開啟" : "靜音"}
                </button>
              </div>

              <Link onClick={handleClose} to="/" className="block mb-2 hover:underline">
                重新測驗
              </Link>
              <a
                onClick={handleClose}
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 hover:underline"
              >
                什麼是 TERRA？
              </a>

              <button
                onClick={() => setExpandQuadrant(prev => !prev)}
                className="w-full flex justify-between items-center mb-2 hover:underline"
              >
                <span>四大象限</span>
                <span>{expandQuadrant ? '－' : '+'}</span>
              </button>
              <AnimatePresence>
                {expandQuadrant && (
                  <motion.div
                    className="overflow-hidden mb-2 pl-2"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={collapseVariants}
                  >
                    {quadrantItems.map(item => (
                      <a
                        key={item.label}
                        onClick={handleClose}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm py-1 hover:underline"
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                onClick={handleClose}
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 hover:underline"
              >
                T 模型與四象限
              </a>
              <a
                onClick={handleClose}
                href="https://test.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
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
