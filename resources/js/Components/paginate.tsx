import { router } from '@inertiajs/react';

type PaginatorLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginator<T = unknown> = {
    data: T[];
    links: PaginatorLink[];
    current_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type PaginateProps<T = unknown> = {
    paginator: Paginator<T> | null | undefined;
};

export function Paginate<T>({ paginator }: PaginateProps<T>) {
    if (!paginator || !paginator.links) {
        return null;
    }

    const { links, data, from, to, total } = paginator;

    if (!links.length || total === 0) {
        return null;
    }

    const previousLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, links.length - 1);

    const handleNavigate = (
        url: string | null,
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        if (!url) {
            return;
        }

        event.preventDefault();

        router.get(
            url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <nav role="navigation" aria-label="Pagination Navigation">
            <div className="flex items-center justify-between gap-2 sm:hidden">
                {previousLink.url ? (
                    <button
                        type="button"
                        onClick={(event) =>
                            handleNavigate(previousLink.url, event)
                        }
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-800 ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:border-blue-300 focus:outline-none focus:ring active:bg-gray-100 active:text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-gray-200 dark:focus:border-blue-700 dark:active:bg-gray-700 dark:active:text-gray-300"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: previousLink.label,
                            }}
                        />
                    </button>
                ) : (
                    <span className="inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: previousLink.label,
                            }}
                        />
                    </span>
                )}

                {nextLink.url ? (
                    <button
                        type="button"
                        onClick={(event) => handleNavigate(nextLink.url, event)}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-800 ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:border-blue-300 focus:outline-none focus:ring active:bg-gray-100 active:text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-gray-200 dark:focus:border-blue-700 dark:active:bg-gray-700 dark:active:text-gray-300"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: nextLink.label,
                            }}
                        />
                    </button>
                ) : (
                    <span className="inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: nextLink.label,
                            }}
                        />
                    </span>
                )}
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-2">
                <div>
                    <p className="text-sm leading-5 text-gray-700 dark:text-gray-600">
                        Showing
                        {from !== null ? (
                            <>
                                <span className="font-medium"> {from} </span>
                                to
                                <span className="font-medium"> {to} </span>
                            </>
                        ) : (
                            <> {data.length} </>
                        )}
                        of
                        <span className="font-medium"> {total} </span>
                        results
                    </p>
                </div>

                <div>
                    <span className="inline-flex rounded-md shadow-sm rtl:flex-row-reverse">
                        {previousLink.url ? (
                            <button
                                type="button"
                                onClick={(event) =>
                                    handleNavigate(previousLink.url, event)
                                }
                                className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium leading-5 text-gray-500 ring-gray-300 transition duration-150 ease-in-out hover:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring active:bg-gray-100 active:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300 dark:focus:border-blue-800 dark:active:bg-gray-700"
                                aria-label="Previous"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <span aria-disabled="true" aria-label="Previous">
                                <span className="inline-flex cursor-not-allowed items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium leading-5 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </span>
                        )}

                        {pageLinks.map((link, index) => {
                            if (link.label === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        aria-disabled="true"
                                    >
                                        <span className="-ml-px inline-flex cursor-default items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                            {link.label}
                                        </span>
                                    </span>
                                );
                            }

                            if (link.active) {
                                return (
                                    <span key={link.label} aria-current="page">
                                        <span className="-ml-px inline-flex cursor-default items-center border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium leading-5 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {link.label}
                                        </span>
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={link.label}
                                    type="button"
                                    onClick={(event) =>
                                        handleNavigate(link.url, event)
                                    }
                                    className="-ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:border-blue-300 focus:outline-none focus:ring active:bg-gray-100 active:text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300 dark:focus:border-blue-800 dark:active:bg-gray-700"
                                    aria-label={`Go to page ${link.label}`}
                                >
                                    {link.label}
                                </button>
                            );
                        })}

                        {nextLink.url ? (
                            <button
                                type="button"
                                onClick={(event) =>
                                    handleNavigate(nextLink.url, event)
                                }
                                className="-ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium leading-5 text-gray-500 ring-gray-300 transition duration-150 ease-in-out hover:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring active:bg-gray-100 active:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300 dark:focus:border-blue-800 dark:active:bg-gray-700"
                                aria-label="Next"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <span aria-disabled="true" aria-label="Next">
                                <span className="-ml-px inline-flex cursor-not-allowed items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium leading-5 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </nav>
    );
}
