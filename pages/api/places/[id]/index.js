import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }
  if (request.method === "PATCH"){
    try {
      const updatedPlace = request.body;
      await Place.findByIdAndUpdate(id, {$set: updatedPlace,});

      response.status(200).json({ message: "Place successfully updated." });

    } catch (error){
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      response.status(200).json({ message: "Place successfully deleted." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}