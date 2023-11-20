import { TTypeSelect, TOpponent, TOpponentSelect } from "@/app/_libs/types";

type SearchBoxModalComponentProps = {
  opponents : TOpponent[] | null;
  searchType: TTypeSelect;
  setSearchType: (type: TTypeSelect) => void;
  searchIsSettled: boolean;
  setSearchIsSettled: (isSettled: boolean) => void;
  sarchOpponent: TOpponentSelect;
  setSearchOpponent: (opponent: TOpponentSelect) => void;
};

const SearchBoxModalComponent = (props: SearchBoxModalComponentProps) => {
  const {
    opponents,
    searchType,
    setSearchType,
    searchIsSettled,
    setSearchIsSettled,
    sarchOpponent,
    setSearchOpponent,
  } = props;

  return (
    <div className="bg-white p-4 shadow-md w-2/3 absolute top-8 right-0 rounded-md">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* 取引タイプ選択 */}
        <div>
          <label htmlFor="searchType" className="text-sm font-bold text-gray-700">
            取引タイプ
          </label>
          <select
            id="searchType"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as TTypeSelect)}
          >
            <option value="all">全て</option>
            <option value="1">貸し</option>
            <option value="2">借り</option>
          </select>
        </div>

        {/* 清算ステータス選択 */}
        <div>
          <label htmlFor="settlementStatus" className="text-sm font-bold text-gray-700">
            清算ステータス
          </label>
          <select
            id="settlementStatus"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchIsSettled ? '1' : '0'}
            onChange={(e) => setSearchIsSettled(e.target.value === '1')}
          >
            <option value="0">未清算</option>
            <option value="1">清算済み</option>
          </select>
        </div>

        {/* 相手タイプ選択 */}
        <div>
          <label htmlFor="partnerType" className="text-sm font-bold text-gray-700">
            相手タイプ
          </label>
          <select
            id="partnerType"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={sarchOpponent}
            onChange={(e) => setSearchOpponent(e.target.value as TOpponentSelect)}
          >
            <option value="all">全て</option>
            {
              opponents?.map((opponent) => (
                <option key={opponent.id} value={opponent.id}>{opponent.name}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
};

export default SearchBoxModalComponent;