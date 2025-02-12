export type AIAudit = {
  _id: string;
  contractAddress: string;
  createdAt: string;
  findings: Array<string>;
  status: string;
  updatedAt: string;
  riskLevel: string;
  securityScore: number;
};
