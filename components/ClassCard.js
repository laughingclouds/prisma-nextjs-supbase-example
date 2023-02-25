export default function ClassCard(props) {
  return (
    <>
      <div className="card card-bordered border-2 shadow-xl hover:shadow-inner w-56 bg-base-100 hover:cursor-pointer">
        <div className="card-body items-center text-center hover:text-secondary-focus">
          <h2 className="card-title">Class <span className="text-secondary">{ props.children }</span></h2>
        </div>
      </div>
    </>
  );
}