export default function TitleInput() {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="topicTitle">
        Topic Title
      </label>
      <span>
        [
        <input
          type="text"
          id="topicTitle"
          className="bg-transparent outline-none w-[180px] border-b-[1px] border-black border-dashed"
        />
        ]
      </span>
    </div>
  )
}
