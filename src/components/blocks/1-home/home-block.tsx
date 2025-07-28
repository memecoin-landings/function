import { ScalableText } from "@/components/text/scalabie-text";
import { ScalableWrapper } from "../scalaible-wrapper";

export default function HomeBlock() {
  return (
    <section className="relative w-full overflow-hidden lg:pt-35 pt-10 md:pt-20">
      <ScalableWrapper className="bg-black">
        <div className="text-white font-bold ">
          <ScalableText size={8} className="tracking-tight ">
            Think.
          </ScalableText>
          <ScalableText
            size={8}
            marginLeft={41}
            leading={4}
            className="tracking-tight "
          >
            Create.
          </ScalableText>
          <ScalableText size={8} className="tracking-tight ">
            Function.
          </ScalableText>
          <div className="content-center">
            <ScalableText
              size={2}
              maxWidth={50}
              marginLeft={38}
              className="text-white font-light text-left"
            >
              Functional design for solving practical business challenges,
              driving growth, and entering new markets
            </ScalableText>
          </div>
        </div>
      </ScalableWrapper>
    </section>
  );
}
