import { download } from "../assets";
import { downloadImage } from "../helpers";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-card hover:shadow-cardhover my-4">
      <img className="w-full h-auto object-cover" src={photo} alt={prompt} />
      <div className="bg-[#10131f] p-4">
        <p className="text-white text-md mb-3">{prompt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button className="bg-transparent border-none outline-none" type="button" onClick={() => downloadImage(_id, photo)}>
            <img className="w-6 h-6 object-contain invert" src={download} alt="download" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
