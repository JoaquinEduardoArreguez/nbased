const AWS = require('aws-sdk');
const inputMetric = require('../../_metric/input');
const { Metadata } = require('../../_helper/metadata');
const { FaultHandled } = require('../../util/error');

const mode = 'INPUT_BATCH_EVENT_STREAM';

module.exports = {
  batchEventReceived: async (event = {}, context = {}) => {
    try {
      const { eventId: id, eventSource: source, time, specversion, tracedDuration, clientId, trackingTag } = event;
      const eventPayload = AWS.DynamoDB.Converter.unmarshall(event.dynamodb.NewImage);
      const eventMeta = new Metadata(context, {
        id,
        source,
        time: time && parseInt(time.stringValue),
        specversion: specversion && specversion.stringValue,
        tracedDuration: (tracedDuration) ? JSON.parse(tracedDuration.stringValue) : {},
        clientId: clientId && clientId.stringValue,
        trackingTag: trackingTag && trackingTag.stringValue,
      });
      inputMetric.input(event, context, mode, eventMeta.get());
      return { eventPayload, eventMeta, event };
    } catch (error) {
      throw new FaultHandled(error.message, { code: 'BAD_INPUT_PROTOCOL_ERROR', layer: mode });
    }
  },
  commitEvent: async (rawEvent) => ({ 
    id: null, 
    status: 'COMMITED' 
  }),
  retryEvent: async (rawEvent, retryStrategy) => ({ 
    id: null, 
    status: 'FAILED', 
    waitingTime: 1 
  }),
}