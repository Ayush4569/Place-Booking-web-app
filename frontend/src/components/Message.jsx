function Message({ message }) {
  if (message) {
    return (
        <div className="animate-bounce w-[40vw] border text-xl border-neutral-400 bg-[#cff9d2] mb-10 text-purple-600 p-4 rounded-md">{message}</div>
    );
  }
  else return ''
}

export default Message;
