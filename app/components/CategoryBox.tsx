'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        //Define empty query
        let currentQuery = {};

        // Parse current query into an object
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        // Spread current query and add category
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // Removes other categories from the query to focus on the one selected
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        // Generate URL string, passing path name
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2 
            p-3 
            border-b-2 
            hover:text-neutral-800 
            transition 
            cursor:pointer 
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;
