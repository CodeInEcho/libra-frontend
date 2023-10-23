import { Icons } from "@/components/icons"

export function StepBar({ step }: { step: number }) {
  return (
    <>
      <div className="flex relative px-2 py-5 bg-[#F5F5F5] rounded-xl">
        <div className="absolute w-[83%] h-[2px] bg-black left-[35px] top-[36%]"></div>
        <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
          <div className="inline-flex flex-col items-center">
            <div className={`${step === 1 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[1.5rem] h-[1.5rem] border border-2 border-black rounded-full`}>
              { step >= 1 && <Icons.check className={`w-[1rem] h-[1rem] ${step === 1 ? 'text-white ' : 'text-black' }`}/> }
            </div>
            <div className="steps-item-content inline-block text-xs font-semibold mt-1">Summary</div>
          </div>
        </div>
        <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
          <div className="inline-flex flex-col items-center">
            <div className={`${step === 2 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[1.5rem] h-[1.5rem] border border-2 border-black rounded-full`}>
              { step >= 2 && <Icons.check className={`w-[1rem] h-[1rem] ${step === 2 ? 'text-white ' : 'text-black' }`}/> }
            </div>
            <div className="steps-item-content inline-block text-xs font-semibold mt-1">Payment</div>
          </div>
        </div>
        <div className="steps-item-container overflow-hidden flex flex-col items-center">
          <div className="inline-flex flex-col items-center">
            <div className={`${step === 3 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[1.5rem] h-[1.5rem] border border-2 border-black rounded-full`}>
              { step >= 3 && <Icons.check className={`w-[1rem] h-[1rem] ${step === 3 ? 'text-white ' : 'text-black' }`}/> }
            </div>
            <div className="steps-item-content inline-block text-xs font-semibold mt-1">Completed</div>
          </div>
        </div>
      </div>
    </>
  )
}