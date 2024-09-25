import {S3Client} from '@aws-sdk/client-s3'
import { envs } from './env'

const s3 = new S3Client({
    region: envs.AWS_REGION,
    credentials: {
        accessKeyId: envs.AWS_ACCESS_KEY_ID,
        secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
    },
    
    // Parcequ'on utilise minio
    endpoint: envs.MIMIO_URL,
    forcePathStyle: true,
})
console.log(envs.AWS_BUCKET_NAME)

export default s3;
