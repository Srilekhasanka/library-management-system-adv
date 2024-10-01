export abstract class CustomApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // Prevent instantiation of the abstract class
    if (this.constructor === CustomApiError) {
      throw new Error(
        'Abstract class "CustomApiError" cannot be instantiated directly.'
      );
    }
  }

  // Abstract getter for statusCode to be implemented in derived classes
  abstract get statusCode(): number;
}
