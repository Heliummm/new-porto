---
title: "Laravel Best Practices: Writing Clean and Maintainable Code"
slug: "laravel-best-practices"
date: "2024-03-15"
excerpt: "Essential best practices for building scalable Laravel applications, from routing and controllers to database design and testing."
tags: ["Laravel", "PHP", "Best Practices", "Backend"]
featured: true
---

# Laravel Best Practices: Writing Clean and Maintainable Code

Laravel is a powerful PHP framework that makes web development enjoyable and efficient. However, as your application grows, maintaining clean and scalable code becomes crucial. Here are essential best practices I've learned from building production Laravel applications.

## 1. Follow Single Responsibility Principle

Each class should have one, and only one, reason to change. Keep your controllers thin and move business logic to services or actions.

```php
// ❌ Bad: Fat controller
class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([...]);
        
        // Create order
        $order = Order::create($validated);
        
        // Send email
        Mail::to($order->user)->send(new OrderConfirmation($order));
        
        // Update inventory
        foreach ($order->items as $item) {
            $item->product->decrement('stock', $item->quantity);
        }
        
        return response()->json($order);
    }
}

// ✅ Good: Thin controller with service
class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, OrderService $orderService)
    {
        $order = $orderService->createOrder($request->validated());
        
        return response()->json($order);
    }
}
```

## 2. Use Form Requests for Validation

Keep your controllers clean by moving validation logic to dedicated Form Request classes.

```php
class StoreOrderRequest extends FormRequest
{
    public function rules()
    {
        return [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string|max:500',
        ];
    }
    
    public function messages()
    {
        return [
            'items.required' => 'Order must contain at least one item',
            'items.*.product_id.exists' => 'Selected product does not exist',
        ];
    }
}
```

## 3. Leverage Eloquent Relationships

Use Eloquent relationships instead of manual joins. It makes your code more readable and maintainable.

```php
// ❌ Avoid manual joins when relationships exist
$orders = DB::table('orders')
    ->join('users', 'orders.user_id', '=', 'users.id')
    ->select('orders.*', 'users.name')
    ->get();

// ✅ Use Eloquent relationships
$orders = Order::with('user')->get();
```

## 4. Use Query Scopes for Reusable Queries

Define common query constraints as scopes in your models.

```php
class Order extends Model
{
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
    
    public function scopeRecent($query)
    {
        return $query->where('created_at', '>=', now()->subDays(30));
    }
}

// Usage
$recentPendingOrders = Order::pending()->recent()->get();
```

## 5. Use Database Transactions

Wrap multiple database operations in transactions to maintain data integrity.

```php
use Illuminate\Support\Facades\DB;

DB::transaction(function () use ($orderData) {
    $order = Order::create($orderData);
    
    foreach ($orderData['items'] as $item) {
        $order->items()->create($item);
        Product::find($item['product_id'])->decrement('stock', $item['quantity']);
    }
    
    event(new OrderCreated($order));
});
```

## 6. Optimize Database Queries

Avoid the N+1 query problem by eager loading relationships.

```php
// ❌ N+1 problem: 1 query for posts + N queries for authors
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // Additional query per post
}

// ✅ Eager loading: 2 queries total
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->name;
}
```

## 7. Use Events and Listeners

Decouple your application logic using Laravel's event system.

```php
// Event
class OrderPlaced
{
    public function __construct(public Order $order) {}
}

// Listener
class SendOrderConfirmation
{
    public function handle(OrderPlaced $event)
    {
        Mail::to($event->order->user)->send(
            new OrderConfirmation($event->order)
        );
    }
}

// Usage in service
event(new OrderPlaced($order));
```

## 8. Write Tests

Test your application to catch bugs early and ensure reliability.

```php
class OrderServiceTest extends TestCase
{
    public function test_can_create_order()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['stock' => 10]);
        
        $orderData = [
            'user_id' => $user->id,
            'items' => [
                ['product_id' => $product->id, 'quantity' => 2]
            ]
        ];
        
        $order = app(OrderService::class)->createOrder($orderData);
        
        $this->assertDatabaseHas('orders', ['id' => $order->id]);
        $this->assertEquals(8, $product->fresh()->stock);
    }
}
```

## Conclusion

These best practices have helped me build maintainable Laravel applications that scale well. Remember, clean code is not just about following rules—it's about making your codebase understandable and maintainable for your future self and your team.

**Key Takeaways:**
- Keep controllers thin, use services for business logic
- Leverage Form Requests for validation
- Use Eloquent relationships and scopes
- Wrap critical operations in transactions
- Eager load relationships to avoid N+1 queries
- Decouple with events and listeners
- Always write tests

What are your favorite Laravel best practices? Feel free to reach out and share your thoughts!
