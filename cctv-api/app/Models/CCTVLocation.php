<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CCTVLocation extends Model
{
    protected $table = 'cctv_locations';

    protected $fillable = [
        'street_name',
        'description',
        'latitude',
        'longitude',
        'stream_url',
        'status',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public $timestamps = true;
    protected $primaryKey = 'id';
}