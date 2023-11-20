'use client';
import { useState } from 'react';
import { TTransaction, TOpponent, TOpponentSelect, TTypeSelect, TCalculateResult, TUser } from '../_libs/types';
import CreateModalComponent from '../_components/Transactions/Modal/CreateModalComponent';
import EditModalComponent from '../_components/Transactions/Modal/EditModalComponent';
import SettleConfirmModalComponent from '../_components/Transactions/Modal/SettleConfirmModalComponent';
import ResultListComponent from '../_components/Transactions/ResultList/ResultListComponent';
import HeadBtnListComponent from '../_components/Transactions/HeadBtnList/HeadBtnListComponent';


type Props = {
  transactions: TTransaction[] | null;
  opponents: TOpponent[] | null;
};


export default function TransactionsPageContent(props: Props) {
  const { transactions, opponents } = props;

  const [searchType, setSearchType] = useState<TTypeSelect>('all');
  const [searchIsSettled, setSearchIsSettled] = useState<boolean>(false);
  const [sarchOpponent, setSearchOpponent] = useState<TOpponentSelect>('all');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isOpenSettleConfirm, setIsOpenSettleConfirm] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [targetEditTransaction, setTargetEditTransaction] = useState<TTransaction | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<TTransaction[]>([]);
  const [calculateSettled, setCalculateSettled] = useState<TCalculateResult[]>([]);

  return (
    <div>
      {/* 検索条件の表示 */}
      <HeadBtnListComponent
        opponents={opponents}
        transactions={transactions}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchIsSettled={setSearchIsSettled}
        sarchOpponent={sarchOpponent}
        setSearchOpponent={setSearchOpponent}
        searchIsSettled={searchIsSettled}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
        selectedTransactions={selectedTransactions}
        setCalculateSettled={setCalculateSettled}
        setIsOpenSettleConfirm={setIsOpenSettleConfirm}
      />

      {/* 検索結果の一覧 */}
      <ResultListComponent
        transactions={transactions}
        opponents={opponents}
        searchType={searchType}
        searchIsSettled={searchIsSettled}
        sarchOpponent={sarchOpponent}
        selectedTransactions={selectedTransactions}
        setSelectedTransactions={setSelectedTransactions}
        setTargetEditTransaction={setTargetEditTransaction}
      />

      {isOpenSettleConfirm && (
        <SettleConfirmModalComponent
          setIsOpenSettleConfirm={setIsOpenSettleConfirm}
          setCalculateSettled={setCalculateSettled}
          calculateResults={calculateSettled}
        />
      )}

      <button
        onClick={() => setIsCreateModalOpen(true)} 
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white font-bold w-10 h-10 rounded-full leading-none text-3xl"
        aria-label="Add"
      >
        +
      </button>

      {isCreateModalOpen && (
        <CreateModalComponent
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {targetEditTransaction && (
        <EditModalComponent
          transaction={targetEditTransaction}
          onClose={() => setTargetEditTransaction(null)}
        />
      )}
    </div>
  );
}