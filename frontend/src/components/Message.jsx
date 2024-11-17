function Message({ message,className }) {
  if (message) {
    return (
        <div className={`animate-slideIn text-nowrap w-[25vw] bg-transparent  border text-xl border-neutral-400 bg-white font-bold  shadow-lg mb-8 text-primary p-4 rounded-md ${className}`}>{message}</div>
    );
  }
  else return ''
}

export default Message;
