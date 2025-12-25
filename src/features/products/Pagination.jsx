import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
function Pagination({ page = 1, totalPages = 1, onPageChange = () => { } }) {
    const safeTotal = Math.max(1, Number(totalPages) || 1);

    const goTo = (p) => {
        if (p < 1 || p > safeTotal || p === page) return;
        onPageChange(p);
    };

    const pages = Array.from({ length: safeTotal }, (_, i) => i + 1);

    return (
        <div className="flex justify-end mt-8 max-w-7xl mx-auto p-2">
            <nav aria-label="Pagination">
                <ul className="flex items-center gap-2">
                    <li>
                        <button
                            onClick={() => goTo(page - 1)}
                            disabled={page === 1}
                            className={`px-1 py-1 border rounded-none ${page === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-black border-gray-300 hover:bg-gray-100 cursor-pointer'}`}
                            aria-label="Previous"
                        >
                            <IoIosArrowBack size={25}/>
                        </button>
                    </li>
                    {pages.map((p) => (
                        <li key={p}>
                            <button
                                onClick={() => goTo(p)}
                                className={`px-3 py-1 border rounded-none ${p === page ? 'bg-black text-white border-black' : 'text-black border-gray-300 hover:bg-gray-100 cursor-pointer'}`}
                            >
                                {p}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => goTo(page + 1)}
                            disabled={page === safeTotal}
                            className={`px-1 py-1 border rounded-none ${page === safeTotal ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-black border-gray-300 hover:bg-gray-100 cursor-pointer'}`}
                            aria-label="Next"
                        >
                            <IoIosArrowForward size={25}/>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination