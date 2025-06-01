import { useNavigate, useSearchParams } from "react-router";

export default function FilterButtons({
  idInput,
  name,
  id,
}: {
  idInput: string;
  name: string;
  id: number;
}) {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const addQueryParam = () => {
    searchParam.append(name, `${id}`);
    navigate(`?${searchParam.toString()}`, { replace: true });
  };

  const deleteQueryParama = () => {
    searchParam.delete(`${name}`, `${id}`);
    navigate(`?${searchParam.toString()}`);
  };

  return (
    <input
      type="checkbox"
      className="mr-2"
      id={idInput}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          addQueryParam();
        } else {
          deleteQueryParama();
        }
      }}
    />
  );
}
