export default function CommentInput() {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="comment">
        Your Reply
      </label>
      <textarea
        className="font-roboto w-full h-auto lg:min-h-[130px] min-h-[80px] max-h-[192px] border-2 border-[#818181] bg-[#D9D9D9] outline-none p-[16px]"
        placeholder="Write your reply..."
        id="comment"
      />
    </div>
  )
}
