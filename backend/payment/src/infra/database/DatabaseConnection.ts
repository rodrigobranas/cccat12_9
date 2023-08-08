// ISP - Interface Segregation Principle a partir da camada de Interface Adapters
export default interface DatabaseConnection {
	query (statement: string, params: any): Promise<any>;
	close (): Promise<void>;
}
