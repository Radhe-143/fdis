const ALLOWED_UPDATE_ATTRIBUTE = [
  'AuditCode',
  'Date',
  'IsActive',
  'IsDone',
  'Id',
  'Type',
  'NameClient_Id',
  'LocationClient_Id',
  'Branch_Id',
  'PresentClient',
  'Attn',
  'week',
  'LastControlDate',
  'Activate',
  'LocationManagerSignImage',
  'newPerformerIds'
];


export default {
  limit: {
    index: 20
  },
  ALLOWED_UPDATE_ATTRIBUTE
}
