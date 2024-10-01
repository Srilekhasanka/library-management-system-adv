import Publisher from "../../../src/module/publishers/publisher.model";

// Define the shape of publisher data
interface PublisherData {
  name: string;
}

// Service to add a new publisher
export const createPublisher = async (
  data: PublisherData
): Promise<Publisher> => {
  return await Publisher.create(data);
};

// Service to update an existing publisher
export const updatePublisher = async (
  id: number,
  data: PublisherData
): Promise<Publisher> => {
  const publisher = await Publisher.findByPk(id);
  if (!publisher) {
    throw new Error("Publisher not found");
  }

  const updatedPublisher = await publisher.update(data);
  return updatedPublisher;
};
