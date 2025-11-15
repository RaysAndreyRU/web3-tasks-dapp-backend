import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getRootInfo() {
        return {
            name: 'Web3 Bounty Board DApp Backend',
            version: '1.0.0',
            status: 'running',
        }
    }
}

