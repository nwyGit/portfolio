// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withErrorHandling, validateMethod } from '@/utils/apiHelpers';

async function handler(req, res) {
	validateMethod(req, res, ['GET']);
	
	res.status(200).json({ 
		name: "John Doe",
		timestamp: new Date().toISOString(),
		status: "ok"
	});
}

export default withErrorHandling(handler);
