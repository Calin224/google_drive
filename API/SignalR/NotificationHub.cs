using System.Collections.Concurrent;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class NotificationHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> _connections = new();

    public override Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (userId != null)
        {
            _connections[userId] = Context.ConnectionId;
        }

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.UserIdentifier;
        if (userId != null)
        {
            _connections.TryRemove(userId, out _);
        }

        return base.OnDisconnectedAsync(exception);
    }

    public static string? GetConnectionIdForUser(string userId)
    {
        _connections.TryGetValue(userId, out var connectionId);
        return connectionId;
    }
}