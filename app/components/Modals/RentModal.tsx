'use client';

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}


const RentModal = () => {

    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    // Workaround because of the custom CategoryInput
    const category = watch('category');

    // setValue does not rerender the page with React Hooks, this workaround will take of that
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    // Go back one step in the list
    const onBack = () => {
        setStep((value) => value - 1);
    };

    // Go forward one step in the list
    const onNext = () => {
        setStep((value) => value + 1);
    };

    // Offers the user to create listing since Price is the end
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'choice';
        }

        return 'Next';
    }, [step]);

    // If we are on the first step, then there is no back button
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect 

                />
            </div>
        )
    }

  return (
    <Modal
        isOpen={rentModal.isOpen} 
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnb your home!" 
        body={bodyContent}
    />
  )
}

export default RentModal;
