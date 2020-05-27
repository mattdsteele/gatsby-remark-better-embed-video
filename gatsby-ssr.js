"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRenderBody = void 0;
const react_1 = __importDefault(require("react"));
exports.onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes, }) => {
    const youtube = (react_1.default.createElement("script", { key: "yt", type: "module", src: "https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@0.8.0/lite-youtube.js" }));
    const vimeo = (react_1.default.createElement("script", { key: "vimeo", type: "module", src: "https://cdn.jsdelivr.net/npm/@slightlyoff/lite-vimeo@0.1.1/lite-vimeo.js" }));
    setHeadComponents([youtube, vimeo]);
};
