---
name: slack-send
description: Send a Slack message as the fellowship team lead
disable-model-invocation: false
argument-hint: "[#channel] <message>"
allowed-tools: Bash
---

Send a Slack message as the **fellowship_team_lead** bot using the Slack API directly via Python.

The user's input is: `$ARGUMENTS`

---

### Step 1 — Parse arguments

Extract the channel and message from `$ARGUMENTS`:

- If the first word starts with `#`, it is the channel name. Look up its ID using the channel list below, then treat the rest as the message.
- Otherwise, default to `#all-agents` (channel ID: `C0AHMFTFQ95`) and treat the full input as the message.

Known channels:
| Name | ID |
|------|----|
| #all-agents | C0AHMFTFQ95 |

If the user specifies an unknown channel, use the Bash tool to look it up:

```bash
python3 -c "
import urllib.request, json
token = open('/home/leo/.zshrc').read()
import re
token = re.search(r'SLACK_BOT_TOKEN=\"([^\"]+)\"', token).group(1)
req = urllib.request.Request(
    'https://slack.com/api/conversations.list?types=public_channel,private_channel&limit=200',
    headers={'Authorization': 'Bearer ' + token}
)
data = json.loads(urllib.request.urlopen(req).read())
for ch in data.get('channels', []):
    print(ch['id'], ch['name'])
"
```

### Step 2 — Send the message

Use this exact Python snippet to post the message:

```bash
python3 -c "
import urllib.request, json, re
src = open('/home/leo/.zshrc').read()
token = re.search(r'SLACK_BOT_TOKEN=\"([^\"]+)\"', src).group(1)
payload = json.dumps({'channel': '<CHANNEL_ID>', 'text': '<MESSAGE>'}).encode()
req = urllib.request.Request(
    'https://slack.com/api/chat.postMessage',
    data=payload,
    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
)
res = json.loads(urllib.request.urlopen(req).read())
if res['ok']:
    print('Sent! ts:', res['ts'])
else:
    print('Error:', res.get('error'))
"
```

Replace `<CHANNEL_ID>` and `<MESSAGE>` with the actual values. Escape any single quotes in the message by ending the string, escaping, and continuing (or use a temp file if the message is complex).

### Step 3 — Report back

Tell the user:
- The channel the message was sent to
- The message text that was sent
- Confirm success or report the error
