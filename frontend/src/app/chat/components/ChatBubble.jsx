const ChatBubble = ({ viewer, sender, receiver, imgSrc, name, time, content }) => {



    if(viewer === receiver){
        return (
    <div class="flex items-end gap-2">
        {imgSrc && <img class="size-8 rounded-full object-cover" src={imgSrc} alt="avatar" />}
        <div class="mr-auto flex w-[60%] flex-col gap-2 rounded-r-xl rounded-tl-xl bg-[#dbdbdb] p-4 text-[#5D5D5C] md:max-w-[60%]">
            <span class="font-semibold text-black">{name}</span>
            <div class="text-md break-words">
                {content}

            </div>
            <span class="ml-auto text-sm">{time}</span>
        </div>
    </div>
  );
    }
    else{
        return(
<div class="flex items-end gap-2">
        <div class="ml-auto flex w-[60%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-blue-700 p-4 text-md text-white md:max-w-[60%] break-words">
            {content}
            <span class="ml-auto text-sm">{time}</span>
        </div>
            {imgSrc && <img class="size-8 rounded-full object-cover" src={imgSrc} alt="avatar" />}

    </div>
        );
        
    }

  
  
};

export default ChatBubble;
