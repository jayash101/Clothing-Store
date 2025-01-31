import { model, Schema } from "mongoose";

const nivoSliderSchema = new Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export const NivoSlider = model("NivoSlider", nivoSliderSchema);
