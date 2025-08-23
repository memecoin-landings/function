import Service from "@/domain/service/service";

export default function ServiceStepsBlock({ service }: { service: Service }) {
  const steps = service?.steps;
  return (
    <section className="max-w-495 w-full fluid-container @container">
      {steps?.map((step, index) => (
        <div key={index} className="flex flex-col w-full">
          <div className="flex flex-row space-x-11.5 sm:space-x-0 xl:px-[8.4cqw] mb-10 md:mb-12.5">
            <div className="text-[1.5rem] leading-[1.875rem] tracking-[-3%] md:text-[1.875rem] md:leading-[100%] md:tracking-[-3%] font-medium text-[#FF3F1A] sm:pr-[5.2cqw]">
              {`0${index + 1}`}
            </div>
            <div className="flex flex-col sm:flex-row">
              <h4 className="text-[1.5rem] leading-[1.875rem] tracking-[-3%] md:text-[1.875rem] md:leading-[100%] md:tracking-[-3%] font-medium text-[#F0EDE8] mb-5.5 sm:pr-[9.7cqw]">
                {step.name}
              </h4>
              <div className="max-w-172.5 flex flex-col space-y-0.5 text-[1rem] leading-[1.625rem] tracking-[-3%] md:text-[1.375rem] md:leading-[2.1875rem] text-[#727272]">
                <p className="text-[#F0EDE8] mb-2.75">{step.description}</p>
                <span>{step.duration}</span>
                <span>{step.revisions}</span>
              </div>
            </div>
          </div>
          <hr className="max-w-296 xl:mx-[8.4cqw] w-full h-0 border border-[#454545]" />
        </div>
      ))}
    </section>
  );
}
